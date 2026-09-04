import unittest
from defusedxml import ElementTree as ET
from defusedxml.common import DefusedXmlException


class XmlSecurityTests(unittest.TestCase):
    def test_external_entities_and_dtd_are_rejected(self):
        payload = '<!DOCTYPE rss [<!ENTITY x SYSTEM "file:///etc/passwd">]><rss>&x;</rss>'
        with self.assertRaises(DefusedXmlException):
            ET.fromstring(payload, forbid_dtd=True, forbid_entities=True, forbid_external=True)

    def test_normal_feed_still_parses(self):
        root = ET.fromstring('<rss><channel><item><title>Notícia</title></item></channel></rss>',
                             forbid_dtd=True, forbid_entities=True, forbid_external=True)
        self.assertEqual(root.find('.//title').text, 'Notícia')
