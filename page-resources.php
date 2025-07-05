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
    "id": "tag-mcqgjf3c-nbo61k",
    "tag": "section",
    "component": "element",
    "style": {
      "display": "inline",
      "height": "200px"
    },
    "children": []
  },
  {
    "id": "tag-mcqgmscj-mcvkaa",
    "tag": "section",
    "component": "element",
    "style": {},
    "children": [
      {
        "id": "tag-mcqgmwwk-fqnhra",
        "tag": "section",
        "component": "element",
        "style": {},
        "children": []
      }
    ]
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