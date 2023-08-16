import unittest
import json
from service.src.jobs.post import handler


class PostJobTest(unittest.TestCase):
    def test_handler_returns_hello_world(self):
        actual = handler(None, None)
        expected = {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True
            }),
            "isBase64Encoded": False
        }
        self.assertEquals(actual, expected)
