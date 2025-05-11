'use strict'

document.addEventListener('DOMContentLoaded', ()=>{
    // добавление задачи
    function AddTask(e, tasck, title, parrent){
        const task_title = title.value;
        const clonTask = tasck.cloneNode(true);
        clonTask.querySelector('.todo_title').innerHTML = task_title;
        clonTask.style.display = 'block';
        // определяем в какой колонке меньше задачь 
        if(parrent.classList.contains('col')){
            parrent = document.querySelectorAll('.col');
            if(parrent[0].childElementCount < parrent[1].childElementCount){
                parrent[0].prepend(clonTask);
            }else{
                parrent[1].prepend(clonTask);

            }
        }else{
            parrent.prepend(clonTask);
        }

        title.value = ''; 
    }
    function OpenTask(bodyTassk){
        let h = bodyTassk.scrollHeight,
                minus = bodyTassk.parentElement.querySelector('.minus_block');

        if(bodyTassk.classList.contains('closed')){
            // 1.закрываем все задачи перед открытием
            document.querySelectorAll('.todo_body').forEach(i=>{
                i.classList.add('closed');
            });
            //2. разварачиваем иконку плюса всем задачам
            document.querySelectorAll('.minus_block').forEach(i=>{
                i.classList.remove('minus_block_active');
            });
            //3. получаем высоту тела задачи
            
            // 4.сворачиваем иконку плюса
            minus.classList.toggle('minus_block_active');
            //5. разворачиваем элемент
            bodyTassk.style.height = `${h}px`;
            bodyTassk.classList.remove('closed');  
            // удаляем фиксированную высоту для растяжения блока под контент
            setTimeout(()=>{ bodyTassk.removeAttribute('style');}, 2000)
        }else {
            // если задача открыта просто закрываем ее
            // обновляем высоту для плавного закрытия
            bodyTassk.style.height = `${h}px`;


            bodyTassk.classList.add('closed');
            document.querySelectorAll('.minus_block').forEach(i=>{
                i.classList.remove('minus_block_active');
            });
            
        }


    }
    
    const todo_item = document.querySelector('.todo_item');
    const todo_list = document.querySelector('.todo_list');
    let col = document.querySelector('.col');
    const task_linck = document.querySelector('.task_linck');
    const task_title = document.querySelector('.task_item');
// первичное добавление задачи
    task_linck.addEventListener('click', function(e){
        e.preventDefault();
        AddTask(this, todo_item, task_title, col);
    })
    task_title.addEventListener('keydown', function(event){
        if (event.key === 'Enter') {
            AddTask(this, todo_item, task_title, col);}
    });

// открытие основной задачи
const btn_open = document.querySelectorAll('.todo_open');

todo_list.addEventListener('click', function(e){
    if(e.target.closest('.todo_open')){
        e.preventDefault();
        
        const body = e.target.closest('.todo_open').parentElement.parentElement.querySelector('.todo_body');
        OpenTask(body);

    } 
    if(e.target.closest('.todo_texteria_btn')){
        e.preventDefault();
        const tasck = e.target.parentElement.parentElement.querySelector('.parrent_title'),
            title = e.target.parentElement.querySelector('.todo_texteria'),
            parrent = e.target.parentElement.parentElement.querySelector('.todo_task_txt');

        AddTask(e, tasck, title, parrent);


    }


    


})



    

})

// $(document).ready(function(){
//     function addTask(){
//         const task_title = $('.task_item').val().trim();
//         if(task_title != ''){
//             const newTask = $('.todo_item').first().clone();
//             newTask.find('.todo_title').text(task_title);
//             const colList = $('.todo_list > div');
//             if(colList[0].childElementCount < colList[1].childElementCount){
//                 $(colList[0]).prepend(newTask);
//             }else{
//                 $(colList[1]).prepend(newTask);

//             }

//             $('.task_item').val('') ;
//             newTask.css({'display':'block'}); 

//             $(this).find('.todo_body').addClass('closed');


//         } 
//     }
//     function oppenTask(e){
//         const body_task = $(e).closest('.todo_item').find('.todo_body');
//         $('.minus_block').css('rotate', `0deg`);
//         if(body_task.hasClass('closed')){
//             const h = body_task[0].scrollHeight;
//             $('.todo_body').addClass('closed');
//             body_task.css('height', `${h}px`);
//             $(e).find('.minus_block').css('rotate', `90deg`);
            
//             body_task.removeClass('closed');
//         }else{
//             body_task.addClass('closed');
//             $(e).find('.minus_block').css('rotate', `0deg`);
//         }
//     }
//     function addTaskText(e){
//         let tasckText = $(e).closest('.todo_body').find('.todo_texteria').val();
//         if(tasckText != ''){
//             $(e).closest('.todo_body').find('.todo_task_txt').text(tasckText);
//             $(e).closest('.todo_body').find('.todo_texteria').val('');
//         }

//     }
//     $('.task_linck').click(function(e) {
//         e.preventDefault();
//         addTask();
        
//     });
//     $('.task_item').on('keydown', (e)=>{
//         if(e.key === 'Enter'){
//             addTask();
//         }
//     })
//     $(document).on('click', '.todo_open', function(e){
//         e.preventDefault();
//         oppenTask(this);
//     });
//     $(document).on('click', '.todo_texteria_btn', function(e){
//         e.preventDefault();
//         addTaskText(this);
//     });
  

// })



