@using $rootnamespace$
@model PageViewModel<LandingPage>
<div class="campaign-wrapper">
    @Html.PropertyFor(x => x.CurrentPage.MainContentArea, new { CssClass = "row equal-height", tag = Global.ContentAreaTags.FullWidth })
</div>
