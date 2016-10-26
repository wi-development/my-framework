@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading">Welcome NOT LOGGED IN</div>



                <div class="panel-body">
                    <p>
                        @can('edit_formxx')
                            EDIT FORM
                        @else
                            NOT EDIT FORM
                        @endcan
                    </p>
                    <p>
                        @can('manage_money')
                            MANAGE MONEY
                        @else
                            NOT MANAGE MONEY
                        @endcan
                    </p>

                </div>
            </div>
        </div>
    </div>
</div>
@endsection
