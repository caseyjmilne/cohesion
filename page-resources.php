<?php get_header(); ?>

<div class="container xl:mx-auto xl:px-4 xl:max-w-6xl min-h-screen flex flex-col justify-between">

    <?php 
        echo $GLOBALS['blade']->render('header', []); 
    ?>

<?php 

$renderer = new ComponentRenderer( $GLOBALS['blade'] );

$lister = '
[
  {
    "id": "tag-mcqi0rc0-gs5o66",
    "tag": "section",
    "component": "element",
    "style": {
      "height": "400px",
      "backgroundColor": "red"
    },
    "children": []
  }
]
';

echo '<!-- ED-TEST -->';
echo $renderer->render( $lister );


$heading_with_data = '
{
  "component": "h2",
  "props": {
    "class": "text-5xl font-bold"
  },
  "children": [
    {
      "component": "text",
      "props": {
        "value": "__dynamic__",
        "bindings": {
          "value": {
            "source": "post",
            "field": "post_title"
          }
        }
      }
    }
  ]
}
';


echo $renderer->render( $heading_with_data );

$query_def = '
{
  "component": "query",
  "props": {
    "name": "posts",
    "type": "post",
    "limit": 3,
    "order": "DESC"
  },
  "children": [
    {
      "component": "ul",
      "children": [
        {
          "component": "loop",
          "props": {
            "data": "posts",
            "as": "post"
          },
          "children": [
            {
              "component": "li",
              "children": [
                {
                  "component": "text",
                  "props": {
                    "value": "__dynamic__",
                    "bindings": {
                      "value": {
                        "source": "loop",
                        "field": "post_title"
                      }
                    }
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
';

echo $renderer->render( $query_def );

?>


    <?php 
        echo $GLOBALS['blade']->render('footer', []); 
    ?>

</div>

<?php get_footer(); ?>