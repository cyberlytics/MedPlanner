#!/bin/bash
docker exec sys-src_backend_1 python manage.py test medplanner.api.tests
