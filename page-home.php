<?php get_header(); ?>

<div class="container xl:mx-auto xl:px-4 xl:max-w-6xl">

    <?php 
        echo $GLOBALS['blade']->render('header', []); 
    ?>

    <section>
        <h1 class="text-9xl"><?php echo get_field('main_heading'); ?></h1>
    </section>

    <section>
        <h2 class="text-4xl">Scalable Data Storage</h2>
        <p>Overcome the limitations of meta storage with Cohesion Collections. More than just a field system, collections are built for scale and utilize custom database tables.</p>
    </section>

    <section>
        <h2 class="text-4xl">Our Community</h2>
        <p>Our community is democratic, passionate and supportive.</p>
    </section>

    <?php

    echo $GLOBALS['blade']->render('hello');

    ?>

    <?php 
        echo $GLOBALS['blade']->render('footer', []); 
    ?>

</div>



<?php get_footer(); ?>