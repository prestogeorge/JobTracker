from pydantic import BaseModel, constr


class CreateJobRequest(BaseModel):
    company: constr(max_length=30)
    job_title: constr(max_length=100)



