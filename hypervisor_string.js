/*
 * Functions for operating on hypervisor-related strings
 */
module.exports = {
	get_connection_string: function(libvirtstring){
		var hypervisor_string = '';
		if (module.exports.is_hypervisor(libvirtstring)) {
				if (libvirtstring=='test') {
					hypervisor_string = libvirtstring + ':///default';
				} else {
					hypervisor_string = libvirtstring + ':///session';
				}
			return hypervisor_string;
		} else {
			return null;
		}
		
	},
	is_hypervisor: function(name){
		if (name=='qemu'||name=='vbox'||name=='test')
			{
				return true;
			}else{
				return false;
			}
	}
};
