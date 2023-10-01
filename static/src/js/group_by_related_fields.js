odoo.define('group_by_related_fields', function(require) {
    let GroupByMenu = require('web.GroupByMenu');
    const controlPanelViewParameters = require('web.controlPanelViewParameters');
    const GROUPABLE_TYPES = controlPanelViewParameters.GROUPABLE_TYPES;

    GroupByMenu.include({
        init: function (parent, groupBys, fields, options) {
            this._super.apply(this, arguments);
            let self = this;
            this.groupableFields = [];
            _.each(fields, function (field, name) {
                if ((field.sortable || (field.depends && field.depends[0] && field.depends[0].split('.').length == 2)) && name !== 'id' && _.contains(GROUPABLE_TYPES, field.type)) {
                    self.groupableFields.push(_.extend({}, field, {
                        name: name,
                    }));
                }
            });
            this.groupableFields = _.sortBy(this.groupableFields, 'string');
        },
    });

});
