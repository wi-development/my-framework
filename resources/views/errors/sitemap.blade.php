@if ($errors->any())
    @if (array_key_exists('sitemap',$errors->getMessages()))
        <div class="alert alert-danger">
            <strong>Whoops!</strong> There were some problems with your input.<br><br>
            <ul>
               @foreach ($errors->getMessages()['sitemap'] as $error)
                    {{dc($error)}}
                @endforeach
            </ul>
        </div>
     @endif
@endif