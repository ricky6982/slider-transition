/*!
 * SliderTransition
 *
 * Copyright 2014 - Ricardo Sarapura
 * 
 * Released under the MIT license
 *
 * Date: 2014-09-28
 */
function SliderTransition(prefijo, nodoActivo, numNodos, animation){
    if (typeof prefijo !== 'string' || typeof nodoActivo !== 'number') {
        console.log('Error en la Inicialiación.');
    }else{
        this.prefijo = prefijo;
        this.nodoActivo = nodoActivo;
        this.numNodos = numNodos;

        this.setAnimation = function(tipo){
            this.animationIn = tipo+'InRight';
            this.animationOut = tipo+'OutLeft';
            this.animationInBack = tipo+'InLeft';
            this.animationOutBack = tipo+'OutRight';
        };

        switch (animation){
            case 'zoom':
                this.setAnimation('zoom');
                break;
            case 'bounce':
                this.setAnimation('bounce');
                break;
            default:
                this.setAnimation('fade');
        }

        this.allAnimation = this.animationIn + ' ' +
                            this.animationInBack + ' ' +
                            this.animationOut + ' ' +
                            this.animationOutBack;

        for (var i = 1; i <= numNodos; i++) {
            $('#'+prefijo + i).addClass('animated hidden');
        }
        $('#'+prefijo+nodoActivo).removeClass('hidden');
        $('#'+prefijo+nodoActivo).parent().addClass('slider-container');
        $('#'+prefijo+nodoActivo).parent().height($('#'+prefijo+nodoActivo).height());



        this.animacion = function(nodoDestino, inicio, fin){
            if (this.nodoActivo != nodoDestino) {
                var nodoInicio = '#'+this.prefijo+this.nodoActivo;
                var nodoFinal = '#'+this.prefijo+nodoDestino;
                $(nodoInicio).removeClass(this.allAnimation);
                $(nodoFinal).removeClass(this.allAnimation);
                $(nodoInicio).addClass(inicio);
                    $(nodoFinal).removeClass('hidden');
                    $(nodoFinal).addClass(fin);
                    $(nodoFinal).parent().height($(nodoFinal).height());
                $(nodoInicio).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    $(nodoInicio).addClass('hidden');
                });
                this.nodoActivo = nodoDestino;
            }
        };

        this.stado = function(){
            for (var i = 1; i < 6; i++) {
                nodo = '#' + this.prefijo + i;
                console.log(nodo);
                console.log($(nodo).attr('class'));
            }
        };

        this.adelante = function(nodo){
                this.animacion(nodo, this.animationOut, this.animationIn);
        };

        this.atras = function(nodo){
                this.animacion(nodo, this.animationOutBack, this.animationInBack);
        };

    }
}
