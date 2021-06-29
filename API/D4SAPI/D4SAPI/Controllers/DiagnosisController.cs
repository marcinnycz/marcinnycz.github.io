using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;

namespace D4SAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiagnosisController : ControllerBase
    {
    private readonly IConfiguration _configuration;

    public DiagnosisController(IConfiguration configuration)
    {
      _configuration = configuration;
    }
    [HttpGet]
    public JsonResult Get()
    {
      string query = @"select DiagnosisId,ExaminationDate,PatientId,ClinicalDiagnosis,FunctionalDescription from dbo.Diagnosis";
      DataTable table = new DataTable();
      string sqlDataSource = _configuration.GetConnectionString("D4SAppCon");
      SqlDataReader myReader;
      using (SqlConnection myCon = new SqlConnection(sqlDataSource))
      {
        myCon.Open();
        using (SqlCommand myCommand = new SqlCommand(query, myCon))
        {
          myReader = myCommand.ExecuteReader();
          table.Load(myReader);

          myReader.Close();
          myCon.Close();
        }
      }
      return new JsonResult(table);
    }
    }
}
