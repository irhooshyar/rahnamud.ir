FROM python:3.7.5
ARG LOAD_MODELS


WORKDIR /app


# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1


# install dependencies
RUN pip install --upgrade pip
COPY ./Backend/requirements.txt /app/requirements.txt
COPY ./Backend/requirements_AI.txt /app/requirements_AI.txt
RUN --mount=type=cache,target=/root/.cache/pip pip install -r requirements.txt --retries 20
RUN --mount=type=cache,target=/root/.cache/pip if $LOAD_MODELS ; then pip install -r requirements_AI.txt --retries 20; fi;

# create aliases
RUN echo '#! /bin/sh' >> /bin/pmmm
RUN echo 'python manage.py makemigrations' >> /bin/pmmm
RUN chmod u+x /bin/pmmm

RUN echo '#! /bin/sh' >> /bin/pmcm
RUN echo 'python manage.py shell < ./docker/django/clean_migrations.py; rm -rf ./doc/migrations/; python manage.py migrate --database=Fa_DataBase --fake; python manage.py makemigrations doc; python manage.py migrate --database=Fa_DataBase --fake-initial' >> /bin/pmcm
RUN chmod u+x /bin/pmcm

RUN echo '#! /bin/sh' >> /bin/pmm
RUN echo 'python manage.py migrate' >> /bin/pmm
RUN chmod u+x /bin/pmm

RUN echo '#! /bin/sh' >> /bin/pmm-fa
RUN echo 'python manage.py migrate --database=Fa_DataBase' >> /bin/pmm-fa
RUN chmod u+x /bin/pmm-fa

# Now copy in our code, and run it
COPY ./Backend /app


RUN if $LOAD_MODELS ; then python -c 'from doc.huggingface_views import *'; fi;
