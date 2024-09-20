from rest_framework import serializers
from .models import Room


class RoomSerializer(serializers.ModelSerializer):
    """serializes room model to return json response """
    class Meta:
        model = Room
        fields = '__all__'
