from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None:
        customized_response = {
            'error': '',
            'status': response.status_code
        }

        if response.status_code == status.HTTP_404_NOT_FOUND:
            customized_response['error'] = 'Resource not found'
        elif response.status_code == status.HTTP_400_BAD_REQUEST:
            customized_response['error'] = 'Bad request'
        elif response.status_code == status.HTTP_401_UNAUTHORIZED:
            customized_response['error'] = 'Unauthorized'
        elif response.status_code == status.HTTP_403_FORBIDDEN:
            customized_response['error'] = 'Forbidden'
        elif response.status_code == status.HTTP_500_INTERNAL_SERVER_ERROR:
            customized_response['error'] = 'Internal server error'
        else:
            customized_response['error'] = response.data.get('detail', 'Something went wrong')

        return Response(customized_response, status=response.status_code)

    return response
