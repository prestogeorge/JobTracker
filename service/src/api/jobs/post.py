from boto3 import resource
from pydantic import ValidationError

from service.src.dao.db_constants import TABLE
from service.src.dao.dynamodb_dao import DynamoDBDao
from service.src.model.jobs.CreateJobRequest import CreateJobRequest
from service.src.util.response import response
DYNAMODB_RESOURCE = {"resource": resource('dynamodb'),
                     "table_name": TABLE}


def handler(event, context):
    try:
        create_job_request = CreateJobRequest(**event['body'])
    except ValidationError as ex:
        raise ex

    global DYNAMODB_RESOURCE
    dynamodb = DynamoDBDao(DYNAMODB_RESOURCE)
    user = "presto"
    job_id = dynamodb.create_job(user, create_job_request.company, create_job_request.job_title)
    return response({'jobId': str(job_id)})
