from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser, User, BaseUserManager
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.utils.timezone import now
from django.utils.translation import ugettext_lazy as _


class UserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""

    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """Create and save a User with the given email and password."""
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        """Create and save a regular User with the given email and password."""
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


# Models: the models that can be used as a ForeignKey must be placed before
# the model that uses the ForeignKeys
class UserProfile(AbstractUser):
    user       = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    # only use email instead of username
    username   = None
    email      = models.EmailField(_('email address'), unique=True)

    # replace username with email and remove email field from required
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS= []

    objects = UserManager()

    def __str__(self):
        return self.email


class Specialization(models.Model):
    description = models.CharField(max_length=100)

    def __str__(self):
        return self.description


class Surgery(models.Model):
    location         = models.CharField(max_length=100)
    street           = models.CharField(max_length=100)
    description      = models.CharField(max_length=100, blank=True)
    telephone_number = models.CharField(max_length=100)
    website          = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.location + '' + self.street


class Doctor(models.Model):
    doctor_first_name = models.CharField(max_length=100, blank=True)
    doctor_last_name  = models.CharField(max_length=100)
    specializations   = models.ManyToManyField(Specialization, blank=True)
    surgery_id        = models.ForeignKey(Surgery, on_delete=models.CASCADE, related_name='surgery', default='', null=True,
                                   blank=True)
    def __str__(self):
        return self.doctor_last_name


class Tag(models.Model):
   description = models.CharField(max_length=100)
   colour      = models.CharField(max_length=100)


class Appointment(models.Model):
    doctor_id = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='doctor')
    #! related_name should not be the same as the referred field names 
    #user      = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='usr', to_field='username', default="awe_user")
    user      = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='usr')
    date_time = models.DateTimeField(verbose_name='appointment date', default=now)
    notes     = models.TextField(blank=True)
    tags      = models.ManyToManyField(Tag, blank=True)


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    """
    Create an authentification token if none is existing for a user.
    In our case it will be created during registration or login, if the user was logged out before.
    """
    if created:
        Token.objects.create(user=instance)

