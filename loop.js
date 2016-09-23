module.exports = {
  foreach: function(input_array, each_function, callback) {

    function looper(location, input_array, each_function, pass_data, callback) {
      if (location >= input_array.length) {
        callback(null, pass_data);
      } else {
        each_function(location, input_array[location], pass_data, function(error, next_data) {
          if (!error) {
            looper(location+1, input_array, each_function, next_data, callback);
          } else {
            callback(error, next_data);
          }
        });
      }
    }

    looper(0, input_array, each_function, null, callback);
  }
};
