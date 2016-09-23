module.exports = {
  foreach: function(input_array, each_function, callback) {

    function looper(location, input_array, each_function, callback) {
      if (location >= input_array.length) {
        callback(null, true);
      } else {
        each_function(location, input_array[location], function(error, data) {
          if (!error) {
            looper(location+1, input_array, each_function, callback);
          } else {
            callback(error, data);
          }
        });
      }
    }

    looper(0, input_array, each_function, callback);
  }
};
