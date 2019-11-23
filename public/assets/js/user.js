$('#userForm').on('submit',function() {
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function() {
            location.reload();
        },
        error: function() {
            alert('用户添加失败')
        }
        
    })
    return false;
});

$('#modifyBox').on('change','#avatar',function() {
    var formData = new FormData();
    formData.append('avatar',this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 不要解析请求参数
        processData: false,
        // 不要设置请求参数类型
        contentType: false,
        success: function(response) {
             $('#preview').attr('src',response[0].avatar); 
             $('#hiddenAvatar').val(response[0].avatar);
        }
    })
})

$.ajax({
    type: 'get',
    url: '/users',
    success: function(response) {
        // console.log(response);
        var html = template('userTpl',{
            data: response
        })
        $("#tbodybox").html(html);      
    }
})

$("#tbodybox").on('click','.edit',function() {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function(response) {
            // console.log(response);
            var html = template('modifyTpl',response)
            // console.log(html);
            $('#modifyBox').html(html)
        }
    })
})

$('#modifyBox').on('submit','#modifyForm',function() {
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function(response) {
            console.log(response);
            
        }
    })
})