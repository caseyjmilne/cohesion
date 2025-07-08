<?php get_header(); ?>

<div style="margin: 80px 0;">
    <h1><?php the_title(); ?></h1>

    <div>
        <?php
            global $post;

            // Get post content, expected to be a JSON string
            $editor_json = get_post_field('post_content', $post->ID);

            // Instantiate renderer
            $renderer = new ComponentRenderer($GLOBALS['blade']);

            // Fallback if content is empty or malformed
            if ($editor_json) {
                $output = $renderer->render($editor_json);
                echo $output ?: '<p style="color: red;">Render failed: Invalid component structure.</p>';
            } else {
                echo '<p style="color: gray;">No editor content found.</p>';
            }
        ?>
    </div>
</div>

<?php get_footer(); ?>
