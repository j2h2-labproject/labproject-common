/*
LabProject
Copyright (C) 2016 Jacob Hartman

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

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
