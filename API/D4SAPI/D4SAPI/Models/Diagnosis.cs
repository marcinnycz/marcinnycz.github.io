using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace D4SAPI.Models
{
  public class Diagnosis
  {
    public int diagnosisID { get; set; }
    public DateTime examinationDate { get; set; }
    public int patientID { get; set; }
    public string clinicalDiagnosis { get; set; }
    public string functionalDescription { get; set; }
  }
}
