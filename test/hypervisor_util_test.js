var LABPROJECT_COMMON_BASE = process.cwd();


var hypervisor_util = require(LABPROJECT_COMMON_BASE + '/hypervisor_string');

var should = require("should");

describe('hypervisor_util Object:', function(){
    
    describe('is_hypervisor function', function(){
      
        it('identifies valid hypervisor', function(){
            
            var input;
            

            input = 'qemu';
            hypervisor_util.is_hypervisor(input).should.be.true;
            input = 'vbox';
            hypervisor_util.is_hypervisor(input).should.be.true;
            
        });
        
        it('identifies invalid hypervisor', function(){
            
            input = 'xen';
            hypervisor_util.is_hypervisor(input).should.be.false;
            input = 'nope';
            hypervisor_util.is_hypervisor(input).should.be.false;
            input = 'asdf';
            hypervisor_util.is_hypervisor(input).should.be.false;
            input = 'vBox';
            hypervisor_util.is_hypervisor(input).should.be.false;
            
        });
        
        
    
        
      });
      
      describe('get_connection_string function', function(){
      
        it('get connection string', function(){
            
            var input;
            
            input = 'qemu';
            hypervisor_util.get_connection_string(input).should.equal('qemu:///session');
            input = 'vbox';
            hypervisor_util.get_connection_string(input).should.equal('vbox:///session');
            
        });
        
        it('invalid hypervisors', function(){
            
            input = 'xen2';
            (hypervisor_util.get_connection_string(input) === null).should.be.true;
            input = 'q3mu';
            (hypervisor_util.get_connection_string(input) === null).should.be.true;
            input = 'fgt';
            (hypervisor_util.get_connection_string(input) === null).should.be.true;
            
        });
        
        
    
        
      });
})

