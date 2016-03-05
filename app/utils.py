import random
import string
import uuid


def random_charts_generator(size=6, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))


def id_generator():
    name = random_charts_generator()
    return uuid.uuid5(uuid.NAMESPACE_DNS, name)