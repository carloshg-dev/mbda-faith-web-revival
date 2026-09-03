"""Bounded publisher downloads; no unbounded response.content allocation."""
import ipaddress
import socket
import time
from urllib.parse import urlparse, urljoin
import requests


def validate_public_url(url):
    parsed = urlparse(url)
    if (parsed.scheme != 'https' or not parsed.hostname or parsed.username or parsed.password
            or parsed.port not in (None, 443) or '\\' in url or len(url) > 2048):
        raise ValueError('Only public HTTPS URLs are supported')
    addresses = socket.getaddrinfo(parsed.hostname, 443, type=socket.SOCK_STREAM)
    if not addresses or any(not ipaddress.ip_address(item[4][0]).is_global for item in addresses):
        raise ValueError('Non-public destination rejected')


class BoundedSession(requests.Session):
    def __init__(self, max_bytes=2_000_000, max_requests=120, max_seconds=360):
        super().__init__()
        self.max_bytes = max_bytes
        self.max_requests = max_requests
        self.deadline = time.monotonic() + max_seconds
        self.requests_used = 0
        self.trust_env = False

    def request(self, method, url, **kwargs):
        if method.upper() != 'GET':
            raise ValueError('Collector session is read-only')
        kwargs['stream'] = True
        kwargs['allow_redirects'] = False
        kwargs['timeout'] = (5, 12)
        for redirect in range(4):
            if self.requests_used >= self.max_requests or time.monotonic() >= self.deadline:
                raise requests.RequestException('Collector request/time budget exhausted')
            validate_public_url(url)
            self.requests_used += 1
            response = super().request(method, url, **kwargs)
            try:
                if response.is_redirect:
                    if redirect == 3:
                        raise requests.RequestException('Too many redirects')
                    url = urljoin(url, response.headers['Location'])
                    continue
                if int(response.headers.get('Content-Length', '0')) > self.max_bytes:
                    raise requests.RequestException('Publisher response exceeds byte budget')
                content = bytearray()
                for chunk in response.iter_content(chunk_size=64 * 1024):
                    if time.monotonic() >= self.deadline or len(content) + len(chunk) > self.max_bytes:
                        raise requests.RequestException('Publisher response exceeds budget')
                    content.extend(chunk)
                response._content = bytes(content)
                response._content_consumed = True
                return response
            finally:
                response.close()
        raise requests.RequestException('Redirect budget exhausted')
