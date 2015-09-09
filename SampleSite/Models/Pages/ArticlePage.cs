using EPiServer.DataAnnotations;
using MultipleDropdownProperty;
using System.ComponentModel.DataAnnotations;

namespace SampleSite.Models.Pages
{
    /// <summary>
    /// Used primarily for publishing news articles on the website
    /// </summary>
    [SiteContentType(
        GroupName = Global.GroupNames.News,
        GUID = "AEECADF2-3E89-4117-ADEB-F8D43565D2F4")]
    [SiteImageUrl(Global.StaticGraphicsFolderPath + "page-type-thumbnail-article.png")]
    public class ArticlePage : StandardPage
    {
        [UIHint("Dropdowns")]
        [BackingType(typeof(MultipleDropDownProperty))]
        [Display(Name ="Page with a specific category", Description ="After select a category in first dropdown, we can select a page with that category in second dropdown")]
        public virtual MultipleDropdownChoices DropDowns { get; set; }
    }
}
