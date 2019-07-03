import pytest
from sklearn.datasets import load_iris

from dataset import IrisDataset

@pytest.fixture(scope="module")
def iris():
    return IrisDataset()


def test_features(iris):
    assert iris.num_features == 4
    assert iris.feature_names == ['sepal length (cm)',
                                  'sepal width (cm)',
                                  'petal length (cm)',
                                  'petal width (cm)']


def test_targets(iris):
    assert iris.num_targets == 3
    assert iris.target_names == ['setosa', 'versicolor', 'virginica']


array([[5.1, 3.5, 1.4, 0.2],
       [4.9, 3. , 1.4, 0.2]])

array([[7. , 3.2, 4.7, 1.4],
       [6.4, 3.2, 4.5, 1.5]])

array([[6.3, 3.3, 6. , 2.5],
       [5.8, 2.7, 5.1, 1.9]])


@pytest.mark.parametrize("name, x_feature, y_feature, x_vals, y_vals", [
    ("setosa", "sepal length (cm)", "sepal width (cm)", [5.1, 4.9], [3.5, 3.]),
    ("setosa", "petal length (cm)", "petal width (cm)", [1.4, 1.4], [0.2, 0.2]),    
])
def test_feature_values(iris, name, x_feature, y_feature, x_vals, y_vals):