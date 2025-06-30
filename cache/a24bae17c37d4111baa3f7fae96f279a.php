<header class="flex gap-8 justify-between items-center bg-neutral-200 mb-12 p-4">
    <div class="flex items-center gap-8">    
        <svg class="w-12 fill-neutral-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M0 241.1C0 161 65 96 145.1 96c38.5 0 75.4 15.3 102.6 42.5L320 210.7l72.2-72.2C419.5 111.3 456.4 96 494.9 96C575 96 640 161 640 241.1l0 29.7C640 351 575 416 494.9 416c-38.5 0-75.4-15.3-102.6-42.5L320 301.3l-72.2 72.2C220.5 400.7 183.6 416 145.1 416C65 416 0 351 0 270.9l0-29.7zM274.7 256l-72.2-72.2c-15.2-15.2-35.9-23.8-57.4-23.8C100.3 160 64 196.3 64 241.1l0 29.7c0 44.8 36.3 81.1 81.1 81.1c21.5 0 42.2-8.5 57.4-23.8L274.7 256zm90.5 0l72.2 72.2c15.2 15.2 35.9 23.8 57.4 23.8c44.8 0 81.1-36.3 81.1-81.1l0-29.7c0-44.8-36.3-81.1-81.1-81.1c-21.5 0-42.2 8.5-57.4 23.8L365.3 256z"/></svg>
        <ul class="flex gap-4 items-center">
            <?php 
                echo $GLOBALS['blade']->render('list_link', [
                    'url' => site_url('academy'),
                    'title' => 'Academy',
                ]); 
            ?>
            <?php 
                echo $GLOBALS['blade']->render('list_link', [
                    'url' => site_url('docs'),
                    'title' => 'Docs',
                ]); 
            ?>
            <?php 
                echo $GLOBALS['blade']->render('list_link', [
                    'url' => site_url('support'),
                    'title' => 'Support',
                ]); 
            ?>
            <?php 
                echo $GLOBALS['blade']->render('list_link', [
                    'url' => site_url('resources'),
                    'title' => 'Resources',
                ]); 
            ?>
        </ul>
    </div>
    <button type="button" class="flex gap-2 items-center border rounded cursor-pointer px-2 py-1">
        <svg class="w-4 fill-neutral-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z"/></svg>
        <span class="text-md font-bold">LOGIN</span>
    </button>
</header><?php /**PATH C:\Users\HP\Local Sites\cohesion2\app\public\wp-content\themes\cohesion\views/header.blade.php ENDPATH**/ ?>