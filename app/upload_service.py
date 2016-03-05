from geosquizzy.squizzy import GeoSquizzy


class UploadService:
    def __init__(self, request=None):
        self.file = self.__read__file__(file=request.files['file'])
        print(self.file)
        self.geojson = GeoJSONService(geojson_doc_type="FeatureCollection", data=self.file)
        # TODO save doc to mongoDB

    @staticmethod
    def __read__file__(file=None):
        return file.read().decode('utf-8')

    def response(self):
        return self.geojson.get_data()


class GeoJSONService:
    def __init__(self, geojson_doc_type=None, data=None):
        self.geo_squizzy = GeoSquizzy(geojson_doc_type=geojson_doc_type)
        self.geo_squizzy.geo_structure.start(geojson=data, is_doc=True)

    def get_data(self):
        return self.geo_squizzy.geo_structure.tree.get_all_leafs_paths()


class MongoDBService:
    pass