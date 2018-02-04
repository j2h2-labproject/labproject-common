var LABPROJECT_COMMON_BASE = process.cwd();


var string = require(LABPROJECT_COMMON_BASE + '/string');

var should = require("should");

describe('string Object:', function(){
    
    describe('uuid function', function(){
      
        it('is a uuid', function(){
            
            var input = "de305d54-75b4-431b-adb2-eb6b9e546014";
            
            string.is_uuid(input).should.be.true;
            
            var input = "aaa05d54-75b4-431b-adb2-eb6b9e546014";
            
            string.is_uuid(input).should.be.true;
            
        });
        it('is not a uuid', function(){
            
            var input = "de305d54-75b4-431b-adb2-eb6b9e546014a";
            
            string.is_uuid(input).should.be.false;
            
            input = "hithere";
            
            string.is_uuid(input).should.be.false;
            
            input = "ze305d54-75b4-431b-adb2-eb6b9e546014a";
            
            string.is_uuid(input).should.be.false;
            
        });
        
    });
     
     
    describe('base64_encode/base64_decode function', function(){
      
        it('encodes', function(){

            string.base64_encode("This is a test").should.equal("VGhpcyBpcyBhIHRlc3Q=");
            
        });
        
        it('decodes', function(){

            string.base64_decode("VGhpcyBpcyBhIHRlc3Q=").should.equal("This is a test");
            
        });
        
    });
})

