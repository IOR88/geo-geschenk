def test_fetching_data_via_urllib(UploadService):
    try:
        upload_service = UploadService(url='https://raw.githubusercontent.com/LowerSilesians/geo-squizzy/master/build_big_data/test_data/ExampleDataPoint.json',
                                           session='TESTA8')
        data = upload_service.response()
        print(data)
    except Exception as e:
        print(e)
