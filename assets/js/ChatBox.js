var sendMessage;
(function () {
    var Message;
    Message = function (arg) {
        this.text = arg.text, this.message_side = arg.message_side;
        this.draw = function (_this) {
            return function () {
                var $message;
                $message = $($('.message_template').clone().html());
                $message.addClass(_this.message_side).find('.text').html(_this.text);
                $('.messages').append($message);
                return setTimeout(function () {
                    return $message.addClass('appeared');
                }, 0);
            };
        }(this);
        return this;
    };
    $(function () {
        var getMessageText, message_side, sendMessage;
        message_side = 'right';
        getMessageText = function () {
            var $message_input;
            $message_input = $('.message_input');
            return $message_input.val();
        };
        window.sendMessage = function (message_side,text) {
            var $messages, message;
            //text=String(text);
            if (text.trim() === '') {
                return;
            }
            $('.message_input').val('');
            $messages = $('.messages');
            //message_side = message_side === 'left' ? 'right' : 'left';
            message = new Message({
                text: text,
                message_side: message_side
            });
            message.draw();
            if(message_side=="right"){
                console.log("hi");
           $.ajax({
            data: {
                text: text,
                user: 'tom'
            },
            type: 'POST',
            url: 'https://helperbee.pythonanywhere.com/message',
            success: function(response) {
                           //alert("Done");
                            window.sendMessage("left",response)
                            console.log("Success");
                       },
            error: function(errMsg) {
                    console.log("error",errMsg)
                    alert(errMsg);
                }   
        })
                            }
            return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
                
        };
        $('.send_message').click(function (e) {
            return window.sendMessage('right',getMessageText());
        });
        $('.message_input').keyup(function (e) {
            if (e.which === 13) {
                return window.sendMessage(getMessageText());
            }
        });
        //window.sendMessage('right','Hello Philip! :)');
        setTimeout(function () {
            //return window.sendMessage('left','Hi Sandy! How are you?<br> Select a Option <br><button type="button" class="btn btn-primary">hi</button><br><button type="button" class="btn btn-primary">hi</button><br><button type="button" class="btn btn-primary">hi</button></div>');
        }, 1000);
        return setTimeout(function () {
            //return window.sendMessage('right','I\'m fine, thank you!');
        }, 2000);
    });
}.call(this));
viewportWidth=$(document).width()
console.log();
if(viewportWidth<500){
$( ".chat_window" ).css( "width", "calc(100% - 20px)" );
$( ".chat_window" ).css( "max-width", "none" );
}    
$("#chat_window").hide();
$("#bee_img").click(function(){
    $("#bee_img").hide();
    $("#chat_window").show();  
});
$("#chat_window_close").click(function(){
    $("#bee_img").show();
    $("#chat_window").hide();  
});
var getNextClick=false;

    window.onclick = e => {
        //console.log(e.target);  // to get the element
        //console.log(e.target.tagName);  // to get the element tag name alone
       
        if (getNextClick & e.target.id!='next_click_btn' & e.target.id!='chat_window_close') {
            e.preventDefault();
            $(e.target).addClass('highlighted');
            // set a timeout that will revert back class after 5 seconds:
            window.setTimeout(function() {
                $(e.target).removeClass('highlighted');
            }, 5 * 1000);//.effect("highlight", {}, 3000);
            getNextClick=false;
             window.sendMessage('right',String($('<div>').text(e.target.outerHTML).html()))
        }  
    }
SETgetNextClick=function(e){
    e = e || window.event;
    e.preventDefault();
    getNextClick=true;
}

$(document).ready(function() {
//window.sendMessage('right',"heya");
window.sendMessage('left',"Bug Report: <button id='next_click_btn'onclick='SETgetNextClick(event)' type='button' class='btn btn-primary'>Select the element <br>on webpage where<br> you have a problem</button> ");
    
});

