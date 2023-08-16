import unittest

from service.src.jobs.post import handler


class PostJobTest(unittest.TestCase):
    def test_handler_returns_hello_world(self):
        actual = handler(None, None)
        expected = "hello world"
        self.assertEquals(actual, expected)