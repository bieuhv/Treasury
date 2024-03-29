$(function() {
	cms.extend(cms.modules, {
		promotion: {
			init: function() {
				this.initEvents();
			},
			initEvents: function() {
				// 
				var _this = this;

				cms.load('tables/jquery.dataTables.js', function() {
					$('table').dataTable({
						"sPaginationType": "full_numbers"
					});
				});

				// actions
				$('.item-action').click(function() {
					var _action = $(this).data('action')
						_id = $(this).data('id');

					// do it
					eval('_this.'+_action+'(_id, this)');
				});
			},
			remove: function(id, obj) {
				cms.confirm('Are you sure you want to remove this item?', function() {
					cms.model('admin/promotion/remove', {id: id}, function(resp) {
						eval('cms.notif.'+(resp.status?'success':'error')+'(resp.msg)');
						$('#row'+id).remove();
					});
				});
			},
			block: function(id, obj) {
				cms.confirm('Are you sure you want to block this item?', function() {
					cms.model('admin/promotion/block', {id: id}, function(resp) {
						eval('cms.notif.'+(resp.status?'success':'error')+'(resp.msg)');
						if(resp.status) {
							$(obj).data('action', 'active')
									.data('original-title', 'Active')
									.html('<span class="icon-ban-circle"></span>');
						}
					});
				});
			},
			active: function(id, obj) {
				cms.confirm('Are you sure you want to active this item?', function() {
					cms.model('admin/promotion/active', {id: id}, function(resp) {
						eval('cms.notif.'+(resp.status?'success':'error')+'(resp.msg)');
						if(resp.status) {
							$(obj).data('action', 'block')
									.data('original-title', 'Block')
									.html('<span class="icon-ok-circle"></span>');
						}
					});
				});
			}
		}
	});

	cms.modules.run('promotion');
});