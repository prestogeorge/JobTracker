import uuid

from service.src.dao.db_constants import USER, JOB


class DynamoDBDao:
    def __init__(self, dynamodb_resource):
        self.resource = dynamodb_resource['resource']
        self.table_name = dynamodb_resource['table_name']
        self.table = self.resource.Table(self.table_name)

    def create_job(self, user, company, job_title):
        job_id = uuid.uuid4()
        self.table.put_item(Item={
            'pk': USER + user,
            'sk': JOB + str(job_id),
            'company': company,
            'job_title': job_title
        })
        return job_id
