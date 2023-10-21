from django.contrib.auth.models import BaseUserManager



#  Custom User Manager
class UserManager(BaseUserManager):
    def create_user(self, email, name, phone_num, password=None):
        """
        Creates and saves a User with the given email, name, tc and password.
        """
        if not email:
            raise ValueError('User must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            name=name,
            phone_num=phone_num, 
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, password=None):
        """
        Creates and saves a superuser with the given email, name, tc and password.
        """
        user = self.model(
            email=self.normalize_email(email),
            name=name, 
        )
        user.set_password(password)
        user.is_admin = True
        user.save(using=self._db)
        return user
    # def create_superuser(self, email, name, phone_num, password=None):
    #     """
    #     Creates and saves a superuser with the given email, name, tc and password.
    #     """
    #     user = self.create_user(
    #         email,
    #         password=password,
    #         name=name,
    #         phone_num=phone_num,
    #     )
    #     user.is_admin = True
    #     user.save(using=self._db)
    #     return user