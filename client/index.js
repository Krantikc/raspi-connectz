(function() {

    window.onload = function() {
        document.querySelector('#text-input').addEventListener('keyup', function(e) {
            

            fetch('http://192.168.0.7:5000', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: "John",
                    email: "john@example.com",
                    key: e.key
                })

            })
            .then((resp) => {
                alert(resp);
            })
            .catch((err) => {
                alert(err);
            });
        });
    };
})();
