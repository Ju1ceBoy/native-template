jQuery(document).ready(function () {
    $('.js--popup-btn').click(function (event) {
        //event.preventDefault()
        $this = $(this);
        $('input[name=carbrand]').val($this.data('carbrand'));
        $('input[name=carmodel]').val($this.data('carmodel'));
        $('input[name=carequipment]').val($this.data('carequipment'));
        $('input[name=carprice]').val($this.data('carprice'));
        $('input[name=carcolor]').val($this.data('carcolor'));
    });

    $('form').submit(function (event) {
        event.preventDefault();
        const btn = $(this).find('button')
        btn.prop('disabled', true);
        $(this).request('onSendForm', {
            success: function (data) {
                btn.prop('disabled', false);
                console.log(data);

                if (data.status === 'success') {
                    if (RG_ID != 0)
                        ym(RG_ID, 'reachGoal', RG_NAME)

                    Fancybox.close();
                    new Fancybox([{ src: '#modal-thanks' }]);
                } else if (data.status === 'error') {
                    Fancybox.close();
                    new Fancybox([{ src: '#modal-error' }]);
                }
            }
        })
    });
})
