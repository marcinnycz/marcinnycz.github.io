using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace D4SAPI.Models
{
  public class Patient
  {
    public int patientID { get; set; }
    public string firstName { get; set; }
    public string lastName { get; set; }
    public DateTime dateOfBirth { get; set; }
    public string email { get; set; }
    public string phone { get; set; }
  }
}
