@if ($errors->any())
    @if (array_key_exists('reference',$errors->getMessages()))
        <div class="alert alert-danger">
            <strong>Whoops!</strong> There were some problems with your input.<br><br>
            <ul>
               @foreach ($errors->getMessages()['reference'] as $error)
                    {{dc($error[0])}}
                @endforeach
            </ul>
        </div>
     @endif
@endif