""" Module providing a dataset class with useful functionality for Bokeh """

from sklearn.datasets import load_iris
from bokeh.models import ColumnDataSource

class IrisDataset:
    def __init__(self):
        #pylint: disable=no-member
        batch = load_iris()
        self._feature_names = batch.feature_names
        self._target_names = batch.target_names
        self._features = {
            name: batch.data[batch.target == i] for i, name in enumerate(batch.target_names)
        }
        self._x_feature = self._feature_names[0]
        self._y_feature = self._feature_names[1]
        self._sources = {
            name: ColumnDataSource() for name in self._target_names
        }
        self._update()

    def _update(self):
        x_index = self._feature_names.index(self._x_feature)
        y_index = self._feature_names.index(self._y_feature)
        for name in self._features:
            x = self._features[name][:, x_index]
            y = self._features[name][:, y_index]
            self._sources[name].data = dict(x=x, y=y)

    @property
    def sources(self):
        return self._sources

    @property
    def title(self):
        return "{} x {}".format(self._x_feature, self._y_feature)

    @property
    def num_targets(self):
        return len(self._target_names)

    @property
    def num_features(self):
        return len(self._feature_names)

    @property
    def feature_names(self):
        return self._feature_names

    @property
    def target_names(self):
        return self._target_names

    @property
    def x_feature(self):
        return self._x_feature

    @x_feature.setter
    def x_feature(self, feature):
        if feature != self._x_feature:
            self._x_feature = feature
            self._update()

    @property
    def y_feature(self):
        return self._y_feature

    @y_feature.setter
    def y_feature(self, feature):
        if feature != self._y_feature:
            self._y_feature = feature
            self._update()

    @property
    def name(self):
        return "Iris Dataset"
