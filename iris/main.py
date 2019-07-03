''' Present an interactive function explorer with slider widgets.

Scrub the sliders to change the properties of the ``sin`` curve, or
type into the title text box to update the title of the plot.

Use the ``bokeh serve`` command to run the example by executing:

    bokeh serve sliders.py

at your command prompt. Then navigate to the URL

    http://localhost:5006/sliders

in your browser.

'''
import numpy as np

from bokeh.io import curdoc
from bokeh.layouts import row, column
from bokeh.transform import linear_cmap
from bokeh.models import ColumnDataSource
from bokeh.models.widgets import Select
from bokeh.plotting import figure

from dataset import IrisDataset


class Plot:
    def __init__(self, dataset):
        self._dataset = dataset

        self._fig = figure(plot_height=800, plot_width=800,
                           title=dataset.title,
                           tools="crosshair,pan,reset,save,wheel_zoom",
                           name="plot")

        targets = dataset.target_names[:3]
        self._fig.circle('x', 'y', source=dataset.sources[targets[0]], color="red")
        self._fig.square('x', 'y', source=dataset.sources[targets[1]], color="green")
        self._fig.triangle('x', 'y', source=dataset.sources[targets[2]], color="blue")


        self._x_select = Select(title="X Axis:",
                                value=dataset.x_feature,
                                options=dataset.feature_names)
        self._y_select = Select(title="Y Axis:",
                                value=dataset.y_feature,
                                options=dataset.feature_names)

        self._x_select.on_change("value", self.update_data)
        self._y_select.on_change("value", self.update_data)
        self._inputs = column(self._x_select, self._y_select, name="inputs")

    def update_data(self, attrname, old, new):
        self._dataset.x_feature = self._x_select.value
        self._dataset.y_feature = self._y_select.value
        self._fig.title.text = self._dataset.title

    @property
    def roots(self):
        yield self._fig
        yield self._inputs


def _main():
    dataset = IrisDataset()
    plot = Plot(dataset)
    for root in plot.roots:
        curdoc().add_root(root)

    curdoc().title = dataset.name


_main()
