<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error 401 | Nifty - Responsive admin template.</title>


    <!--STYLESHEET-->
    <!--=================================================-->



    <!--Bootstrap Stylesheet [ REQUIRED ]-->
    <link href="{{config('wi.dashboard.theme_path')}}/css/bootstrap.min.css" rel="stylesheet">


    <!--Nifty Stylesheet [ REQUIRED ]-->
    <link href="{{config('wi.dashboard.theme_path')}}/css/nifty.min.css" rel="stylesheet">

    <!--Nifty Premium Icon [ DEMO ]-->
    <link href="{{config('wi.dashboard.theme_path')}}/css/demo/nifty-demo-icons.min.css" rel="stylesheet">


    <!--Font Awesome [ OPTIONAL ]-->
    <link href="{{config('wi.dashboard.theme_path')}}/vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet">




    <!--SCRIPT-->
    <!--=================================================-->

    <!--Page Load Progress Bar [ OPTIONAL ]-->
    <link href="{{config('wi.dashboard.theme_path')}}/vendor/pace/pace.min.css" rel="stylesheet">
    <script src="{{config('wi.dashboard.theme_path')}}/vendor/pace/pace.min.js"></script>



    <!--

    REQUIRED
    You must include this in your project.

    RECOMMENDED
    This category must be included but you may modify which plugins or components which should be included in your project.

    OPTIONAL
    Optional plugins. You may choose whether to include it in your project or not.

    DEMONSTRATION
    This is to be removed, used for demonstration purposes only. This category must not be included in your project.

    SAMPLE
    Some script samples which explain how to initialize plugins or components. This category should not be included in your project.


    Detailed information and more samples can be found in the document.

    -->

</head>

<!--TIPS-->
<!--You may remove all ID or Class names which contain "demo-", they are only used for demonstration. -->

<body>
{{dc(response())}}
<div id="container" class="cls-container">

    <!-- HEADER -->
    <!--===================================================-->
    <div class="cls-header">
        <div class="cls-brand">
            <a class="box-inline" href="index.html">
                <!-- <img alt="Nifty Admin" src="images/logo.png" class="brand-icon"> -->
                <span class="brand-title">Nifty <span class="text-thin">Admin</span></span>
            </a>
        </div>
    </div>

    <!-- CONTENT -->
    <!--===================================================-->
    <div class="cls-content">
        <h1 class="error-code text-warning">401</h1>
        <p class="h4 text-thin pad-btm mar-btm">
            <i class="fa fa-exclamation-circle fa-fw"></i>
            The request has not been applied because it lacks valid authentication credentials for the target resource.
        </p>
        <div class="row mar-btm">
            <form class="col-xs-12 col-sm-10 col-sm-offset-1" method="post" action="pages-search-results.html">
                <input type="text" placeholder="Search.." class="form-control input-lg error-search">
            </form>
        </div>
        <br>
        <div class="pad-top"><a class="btn-link" href="index.html">Back to Homepage</a></div>
    </div>


</div>
<!--===================================================-->
<!-- END OF CONTAINER -->



<!--JAVASCRIPT-->
<!--=================================================-->

<!--jQuery [ REQUIRED ]-->
<script src="{{config('wi.dashboard.theme_path')}}/js/jquery-2.2.1.min.js"></script>


<!--BootstrapJS [ RECOMMENDED ]-->
<script src="{{config('wi.dashboard.theme_path')}}/js/bootstrap.min.js"></script>


<!--Fast Click [ OPTIONAL ]-->
<script src="{{config('wi.dashboard.theme_path')}}/vendor/fast-click/fastclick.min.js"></script>


<!--Nifty Admin [ RECOMMENDED ]-->
<script src="{{config('wi.dashboard.theme_path')}}/js/nifty.min.js"></script>


<!--

REQUIRED
You must include this in your project.

RECOMMENDED
This category must be included but you may modify which plugins or components which should be included in your project.

OPTIONAL
Optional plugins. You may choose whether to include it in your project or not.

DEMONSTRATION
This is to be removed, used for demonstration purposes only. This category must not be included in your project.

SAMPLE
Some script samples which explain how to initialize plugins or components. This category should not be included in your project.


Detailed information and more samples can be found in the document.

-->


</body>
</html>