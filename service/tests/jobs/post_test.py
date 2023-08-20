import unittest
from unittest.mock import patch, MagicMock

import moto
from boto3 import resource


from service.src.api.jobs.post import handler
from service.src.dao.db_constants import TABLE
from service.src.dao.dynamodb_dao import DynamoDBDao


@moto.mock_dynamodb
class PostJobTest(unittest.TestCase):
    def setUp(self) -> None:
        dynamodb = resource("dynamodb", region_name="us-west-1")
        dynamodb.create_table(
            TableName=TABLE,
            KeySchema=[{"AttributeName": "pk", "KeyType": "HASH"}],
            AttributeDefinitions=[{"AttributeName": "pk", "AttributeType": "S"}],
            BillingMode='PAY_PER_REQUEST'
        )
        mocked_dynamodb_resource = {"resource": resource('dynamodb'),
                                    "table_name": TABLE}
        self.mocked_dynamodb_class = DynamoDBDao(mocked_dynamodb_resource)

    @patch("service.src.dao.dynamodb_dao.DynamoDBDao")
    def test_handler_returns_200(self, mock_dao: MagicMock):
        mock_dao.return_value = self.mocked_dynamodb_class
        request = {
            'company': 'Google',
            'job_title': 'Software Engineer II'
        }
        event = {'body': request}
        actual = handler(event, None)
        self.assertEquals(actual['statusCode'], 200)
