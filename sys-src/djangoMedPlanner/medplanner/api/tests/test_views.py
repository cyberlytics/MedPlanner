from django.test import TestCase
from django.urls import reverse
from rest_framework import status

from medplanner.api.tests.factories import DoctorFactory


'''class CompanyViewSetTestCase(TestCase):
      def setUp(self):
          self.user = UserFactory(email='testuser@example.com')
          self.user.set_password('testpassword')
          self.user.save()
          self.client.login(email=self.user.email, password='testpassword')
          self.list_url = reverse('company-list')

      def get_detail_url(self, company_id):
          return reverse(self.company-detail, kwargs={'id': company_id})'''
