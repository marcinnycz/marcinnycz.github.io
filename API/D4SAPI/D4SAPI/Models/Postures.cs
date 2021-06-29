using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace D4SAPI.Models
{
  public class Postures
  {
    public int postureId { get; set; }
    public int patientID { get; set; }
    public DateTime dateOfMeasurement { get; set; }
    public double IMUPelvisY { get; set; }
    public double IMUChestY { get; set; }
  }
}
