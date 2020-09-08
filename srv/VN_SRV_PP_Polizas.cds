/*****************************************Servicios para JOB PP ******************************************
1) Consulta Pólizas PM
        URL:
/***********************************************************************************/

service PolizasService {

	type CPOut{
	        documento: String;
	      }
    function setS4PolizaPM ( ) returns CPOut; // returns array of typeCreatePolizaPM;
}