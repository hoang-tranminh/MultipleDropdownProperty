using EPiServer.Shell.Services.Rest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MultipleDropdownProperty.RestStore
{
    public abstract class SecondDropDownChoicesStoreBase : RestControllerBase
    {
        public virtual RestResult Get(string selectedFirstChoiceId, string currentContentId)
        {
            if (selectedFirstChoiceId != null && currentContentId != null)
                return base.Rest(GetChoices(selectedFirstChoiceId, currentContentId));
            else
                return base.Rest(new List<ChoiceModel>());
        }

        /// <summary>
        /// Should return all the choices based on selected value of first drop down and current editing content
        /// </summary>
        /// <returns></returns>
        public abstract IEnumerable<ChoiceModel> GetChoices(string selectedFirstChoiceId, string currentContentId);

        public virtual RestResult Put(ChoiceModel entity)
        {
            throw new NotSupportedException();
        }

        public virtual RestResult Post(ChoiceModel entity)
        {
            throw new NotSupportedException();
        }

        public virtual RestResult Delete(int id)
        {
            return null;
        }
    }
}
