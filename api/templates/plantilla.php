<!DOCTYPE html>
<html lang='en'>

<head>
  <meta charset='UTF-8'>
  <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <meta http-equiv='X-UA-Compatible' content='ie=edge'>
  <title>Reporte</title>
  <style>
    .elemento {
        margin-right: 30px;
        display: inline-block;
        margin-bottom: 15px;
    }

    .cuerpo {
        margin: 20px 0;
    }



    .text-center {
      text-align: center;
    }

    .membrete {
      margin: auto;
      display: block;
      width: 80%;
      height: 50px;
    }

    span.campo_subrayado {
      width: auto;
      padding: 0 8px;
      border-bottom: 1px solid black;
      min-width: 80px;
      display: inline-block;
    }

    span.elementoFirma {
      border-top: 1px solid black;
      padding: 0 8px;
      margin-top:50px;
      display: inline-block;
      margin-left: 20%;
    }

    table {
      font-family: arial, sans-serif;
      border-collapse: collapse;
      font-size: 10px;
       margin: auto;

    }
span.text-rotado {
    transform: rotate(-90deg);
    display: block;
    word-break: break-word;
    width: 70px;
}

    th,
    td {
      border: 1px solid black;
      padding: 4px;
      text-align: center;
    }

.pivote th {
    height: 30px;
    width: 30px !important;
    padding: 0;
    position: relative;
}

    span.text-rotado {
        transform: rotate(-90deg);
        display: block;
        word-break: break-word;
        width: 70px;
        height: 100%;
        position: absolute;
        top: 0px;
        left: 5px;
    }

    .cuerpo {
    clear: both;
}
  </style>

</head>

<body>

  <div>
    <div>
      <H4 class='text-center'>PROGRAMA NACIONAL DE FORMACIÓN EN
        <span style="text-transform:UPPERCASE;"><?php echo $datos['seccion'][0]['nombreMalla']; ?></span> (PNFI) CONTROL DE PLANIFICACIÓN Y ASISTENCIA</H4>
      <div class='datos'>
        <div>
          <span class='elemento'>
            <span>Docente:</span>
            <span class='campo_subrayado'>
              <?php echo $datos['seccion'][0]['nombre_completo']; ?>
            </span>
          </span>

          <span class='elemento'>
            <span>Unidad Curricular:</span>
            <span class='campo_subrayado'>
              <?php echo $datos['seccion'][0]['nombre_asig']; ?>
            </span>
          </span>
          <span class='elemento'>
            <span>Sección:</span>
            <span class='campo_subrayado'>
              <?php echo $datos['seccion'][0]['nombreSeccion']; ?>
            </span>
          </span>
        </div>
        <div>
          <span class='elemento'>
            <span>PNF:</span>
            <span class='campo_subrayado'>
              <?php echo $datos['seccion'][0]['nombreMalla']; ?>
            </span>
          </span>
          <span class='elemento'>
            <span>Período Académico:</span>
            <span class='campo_subrayado'>
              <?php echo $datos['seccion'][0]['trimestre']; ?> Trimestre
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>
  <div class='cuerpo'>
    <table>
      <thead>
        <tr class='pivote'>
          <th colspan='4' style='border:none;'></th>

          <?php foreach($datos['encuentros'] as $key => $v): ?>
          <th></th>
          <?php endforeach; ?>

          <th rowspan='3'><span class="text-rotado">Total Asistencia</span></th>
          <th rowspan='3'><span class="text-rotado">Porcentaje de Asistencias</span></th>
          <th rowspan='3'><span class="text-rotado">Porcentaje de Insasistencias</span></th>
        </tr>
        <tr>
          <th colspan='4' style='border:none; text-align:right;'>OBJETIVOS FACILITADOS O EVALUADOS</th>

          <?php foreach($datos['encuentros'] as $key => $v): ?>
          <th>C
            <?php echo $key+1; ?>
          </th>
          <?php endforeach; ?>

        </tr>
        <tr>
          <th colspan='4' style='border:none; text-align:right;'>FECHA</th>

          <?php foreach($datos['encuentros'] as $key => $v): ?>
          <th>
            <?php echo $v['fecha']; ?> 
          </th>
          <?php endforeach; ?>
        </tr>
        <tr>
          <th>Nº</th>
          <th>CEDULA</th>
          <th>APELLIDOS Y NOMBRES</th>
          <th>EDE</th>

          <?php foreach($datos['encuentros'] as $key => $v): ?>
          <th></th>
          <?php endforeach; ?>
          <th rowspan='2'></th>
          <th rowspan='2'></th>
          <th rowspan='2'></th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($datos['alumnos_seccion'] as $key=> $value): ?>
        <tr>
          <td>
            <?php echo $key+1; ?> </td>
          <td>
            <?php echo $value['cedula']; ?> </td>
          <td>
            <?php echo $value['nombre_completo']; ?> </td>
          <td>CMA</td>

          <?php foreach ($datos['alumnos_seccion'][$key]['asistencias'] as $llave => $value): ?>

          <td>
            <?php echo $value['asistio']; ?> </td>

          <?php endforeach; ?>

          <td>
            <?php echo count($datos['encuentros']); ?>
          </td>
          <td>
            <?php echo $datos['alumnos_seccion'][$key]['porcentaje_asistencias']; ?>%
          </td>
          <td>
            <?php echo $datos['alumnos_seccion'][$key]['porcentaje_inasistencias']; ?>%
          </td>
        </tr>

        <?php endforeach; ?>
        <tr>
          <th colspan='3' style='border:none;'></th>
          <td style='border:none;'>Firma Vocero</td>
          <?php foreach($datos['encuentros'] as $key => $v): ?>
          <td></td>
          <?php endforeach; ?>
        </tr>
      </tbody>
    </table>
  </div>
  <div>
    <span class='elementoFirma'>Firma del Docente</span>
    <span class='elementoFirma'>Firma y Sello de la Coordinación que administra la Sección</span>
  </div>
</body>

</html>
